/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_destroy_factory.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/21 19:29:16 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:52:07 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_destroy_factory(char ***factory)
{
	char	**tmp;
	int		i;

	tmp = *factory;
	i = 0;
	while (tmp[i])
		ft_strdel(&tmp[i++]);
	free(tmp);
	tmp = NULL;
}
