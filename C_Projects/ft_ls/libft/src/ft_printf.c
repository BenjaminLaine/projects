/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_printf.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/12/06 13:31:11 by blaine            #+#    #+#             */
/*   Updated: 2020/01/30 21:59:04 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_print_everything(t_stf *stf)
{
	int		lenght;

	lenght = 0;
	while (stf->str[stf->idx])
	{
		lenght = ft_strclen(stf->str + stf->idx, '%');
		if (lenght > -1)
		{
			ft_putnstr(stf, stf->idx, lenght);
			stf->idx += lenght + 1;
			ft_get_flags(stf);
			print_argument(stf);
			ft_reset_flags(stf);
		}
		else
		{
			ft_putstr(stf->str + stf->idx);
			stf->printed += ft_strlen(stf->str + stf->idx);
			stf->idx += ft_strlen(stf->str + stf->idx);
		}
	}
}

int		ft_printf(const char *str, ...)
{
	t_stf	*stf;

	if (!(stf = (t_stf*)malloc(sizeof(t_stf))))
		return (-1);
	make_struct(stf, str);
	if (str)
	{
		va_start(stf->args, str);
		ft_print_everything(stf);
	}
	free(stf);
	return (stf->printed);
}
