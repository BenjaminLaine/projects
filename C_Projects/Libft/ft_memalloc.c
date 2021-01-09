/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memalloc.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/18 20:12:56 by blaine            #+#    #+#             */
/*   Updated: 2019/10/25 00:48:52 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	*ft_memalloc(size_t size)
{
	int		i;
	void	*str;

	i = 0;
	if (!(str = malloc(size)))
		return (NULL);
	while (size > 0)
	{
		*((int*)str + i) = 0;
		i++;
		size--;
	}
	return (str);
}
