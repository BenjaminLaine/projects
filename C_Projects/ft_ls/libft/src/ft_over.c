/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_over.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/25 02:19:33 by blaine            #+#    #+#             */
/*   Updated: 2020/06/08 17:46:50 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_over(char **dest, char *new, size_t start, size_t len)
{
	size_t	lenght;
	int		index;
	int		i;
	char	*tmp;

	lenght = ft_strlen(*dest);
	index = start;
	i = 0;
	tmp = *dest;
	if (dest && *dest && new && start < lenght && start + len <= lenght)
	{
		while (tmp[index] && len-- > 0)
			tmp[index++] = new[i++];
	}
}
